import { login } from '@/app/signin/sign-in-form.helper';
import { getCookie } from 'cookies-next';
import { toast } from 'sonner';
import { z } from 'zod';

export const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Provide team name' }),
    password: z.string().min(6, { message: 'Provide password (min 6 signs)' }),
    confirmPassword: z.string().min(1, { message: 'Confirm password' }),
    description: z.string().min(1, { message: 'Provide team description' }),
    members: z.array(
      z.object({
        name: z.string().min(1, {
          message: 'Provide member full name',
        }),
        email: z.string().email({
          message: 'Provide valid email address',
        }),
      }),
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.members.length > 0, {
    message: 'Provide at least one member',
    path: ['members'],
  });

export type SignUpCredentials = z.infer<typeof formSchema>;

export const addMember = async ({
  name,
  email,
  teamId,
}: {
  name: string;
  email: string;
  teamId: number;
}) => {
  try {
    const res = await fetch('http://localhost:8000/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
      body: JSON.stringify({ name, email, teamId }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }
    return true;
  } catch (error) {
    const err = error as { message: string };
    toast.error(err.message);
  }
};

export const signup = async (
  name: string,
  password: string,
  description: string,
  members: { name: string; email: string }[],
) => {
  try {
    const res = await fetch('http://localhost:8000/teams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        password,
        description,
      }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }
    const data = await res.json();

    toast.success('Team created successfully');
    const logRes = await login(name, password);
    if (logRes) {
      try {
        await Promise.all(
          members.map((member) =>
            addMember({
              name: member.name,
              email: member.email,
              teamId: data.id,
            }),
          ),
        );
      } catch (error) {
        throw new Error('Failed to create team members');
      }
    }
    return true;
  } catch (error) {
    const err = error as { message: string };
    toast.error(err.message);
  }
  return false;
};
