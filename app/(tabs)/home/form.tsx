import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string(),
  password: z
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .regex(/[A-Z]/, 'Deve conter ao menos uma letra maiúscula'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Form() {
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
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log('Dados válidos:', data);
    // Aqui você pode chamar sua API, navegar, etc.
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        {/* Campo Nome */}
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <TextInput
                label="Nome"
                mode="outlined"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                autoCapitalize="words"
                style={styles.input}
              />
              {errors.name && (
                <HelperText type="error" visible>
                  {errors.name.message}
                </HelperText>
              )}
            </>
          )}
        />

        {/* Campo E-mail */}
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <TextInput
                label="E-mail"
                mode="outlined"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
              {errors.email && (
                <HelperText type="error" visible>
                  {errors.email.message}
                </HelperText>
              )}
            </>
          )}
        />

        {/* Campo Senha */}
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <TextInput
                label="Senha"
                mode="outlined"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry
                style={styles.input}
              />
              {errors.password && (
                <HelperText type="error" visible>
                  {errors.password.message}
                </HelperText>
              )}
            </>
          )}
        />

        {/* Botão de enviar */}
        <Button
          mode="contained"
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          style={styles.button}>
          Registrar
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  form: {
    gap: 12,
  },
  input: {
    backgroundColor: 'white',
  },
  button: {
    marginTop: 16,
  },
});
