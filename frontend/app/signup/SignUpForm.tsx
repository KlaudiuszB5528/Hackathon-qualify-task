'use client';
import TooltipComponent from '@/components/TooltipComponent';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';

import { Input } from '@components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import signUpImg from 'public/signup.svg';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  formSchema,
  signup,
  type SignUpCredentials,
} from './sign-up-form.helper';
export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<SignUpCredentials>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      password: '',
      confirmPassword: '',
      description: '',
    },
  });
  const members = useFieldArray({
    control: form.control,
    name: 'members',
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async () => {
          const res = await signup(
            form.getValues('name'),
            form.getValues('password'),
            form.getValues('description'),
            form.getValues('members'),
          );
          if (res) router.push('/dashboard');
        })}
        className="w-full lg:grid lg:grid-cols-2"
      >
        <ScrollArea className="h-screen">
          <div className="flex items-center h-full justify-center py-12 ">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Create a Team</h1>
                <p className="text-balance text-muted-foreground">
                  You need team to sign in to hackathons
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team name</FormLabel>
                        <FormControl>
                          <Input placeholder="eg. Piękne Umysły" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="resize-none"
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Team members</span>
                  {form.formState.errors.members !== undefined && (
                    <span className="text-red-600">
                      {form.formState.errors.members.message}
                    </span>
                  )}
                  {members.fields.length < 4 && (
                    <TooltipComponent
                      asChild
                      trigger={
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => {
                            members.append(
                              { name: '', email: '' },
                              { shouldFocus: true },
                            );
                          }}
                        >
                          +
                        </Button>
                      }
                      content={<p>Add a team member</p>}
                    />
                  )}
                </div>
                {members.fields.map((field, index) => {
                  return (
                    <div key={field.id}>
                      <h3 className="flex justify-between items-center">
                        <span>{`${index + 1}.`}</span>
                        <TooltipComponent
                          asChild
                          trigger={
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => {
                                members.remove(index);
                              }}
                            >
                              -
                            </Button>
                          }
                          content={<p>Remove a team member</p>}
                        />
                      </h3>
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name={`members.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name={`members.${index}.email`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {index !== members.fields.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  );
                })}
                <Button
                  type="submit"
                  className="my-6 bg-fuchsia-700 hover:bg-fuchsia-800"
                >
                  Create team
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="hidden bg-muted lg:block h-screen">
          <Image
            src={signUpImg}
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </form>
    </Form>
  );
}
