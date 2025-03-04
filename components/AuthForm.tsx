'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type FormType = 'sign-in' | 'sign-up';

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === 'sign-up'
      ? z.string().min(2).max(50)
      : z.string().optional(),
  });
};

const AuthForm = ({ type }: {type: FormType}) => {

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      fullName: '',
    }
  })

  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    
  }



  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='auth-form'>
          <h1 className='form-title'>
            {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
          </h1>
          {type === 'sign-up' && (
            <FormField
              control={form.control}
              name='fullName'
              render={({ field }) => (
                <FormItem>
                  <div className='shad-form-item'>
                    <FormLabel className='shad-form-label'>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your full name'
                        className='shad-input'
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='shad-form-message' />
                </FormItem>
              )}
            >

            </FormField>
          )}
        </form>
      </Form>
    </>
  )
}

export default AuthForm