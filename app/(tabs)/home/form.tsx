import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, View, type TextInput as RNTextInputType } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/Input/Input';

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome não pode ter mais de 50 caracteres'),

  email: z.string().min(1, 'E-mail é obrigatório'),

  password: z
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Deve conter ao menos uma letra maiúscula')
    .regex(/[a-z]/, 'Deve conter ao menos uma letra minúscula')
    .regex(/\d/, 'Deve conter ao menos um número'),

  phone: z
    .string()
    .min(10, 'Telefone deve ter pelo menos 10 dígitos')
    .max(11, 'Telefone não pode ter mais de 11 dígitos')
    .regex(/^\d+$/, 'Telefone deve conter apenas números'),

  description: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(200, 'Nome não pode ter mais de 200 caracteres'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Form() {
  const emailRef = useRef<RNTextInputType>(null);
  const passwordRef = useRef<RNTextInputType>(null);
  const phoneRef = useRef<RNTextInputType>(null);
  const descriptionRef = useRef<RNTextInputType>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      description: '',
    },
  });

  const handlePhoneChange = (value: string) => {
    return value.replace(/\D+/g, '');
  };

  const onSubmit = (data: RegisterFormData) => {
    console.log('Dados válidos:', data);
  };

  return (
    <SafeAreaView className="flex-1 justify-center p-4">
      <View className="gap-3">
        <Input
          name="Name"
          identifier="name"
          placeholder="Nome"
          control={control}
          error={errors.name}
          required
          autoCapitalize="words"
          autoComplete="name"
          returnKeyType="next"
          maxLength={5}
          onSubmitEditing={() => emailRef.current?.focus()}
        />

        <Input
          ref={emailRef}
          name="Email"
          identifier="email"
          placeholder="Email"
          control={control}
          error={errors.email}
          required
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />

        <Input
          ref={passwordRef}
          name="Password"
          identifier="password"
          placeholder="Senha"
          control={control}
          error={errors.password}
          required
          secureTextEntry
          returnKeyType="next"
          onSubmitEditing={() => phoneRef.current?.focus()}
        />

        <Input
          ref={phoneRef}
          name="Phone Number"
          identifier="phone"
          placeholder="(555) 123-4567"
          control={control}
          error={errors.phone}
          mask="US_PHONE_DYNAMIC"
          required
          keyboardType="phone-pad"
          returnKeyType="next"
          maxLength={17}
          customOnChange={handlePhoneChange}
          onSubmitEditing={() => descriptionRef.current?.focus()}
        />

        <Input
          ref={descriptionRef}
          name="Description"
          identifier="description"
          placeholder="description"
          control={control}
          error={errors.description}
          required
          helperText="Descreva sua experiência em até 200 caracteres"
          maxLength={200}
          multiline
          onSubmit={handleSubmit(onSubmit)}
        />

        <Button
          mode="contained"
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          className="mt-4">
          Registrar
        </Button>
      </View>
    </SafeAreaView>
  );
}
