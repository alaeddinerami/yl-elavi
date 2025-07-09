import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  Image,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required('Nom obligatoire'),
  phone: Yup.string()
    .required('Téléphone obligatoire')
    .matches(/^[5-7][0-9]{8}$/, 'Format invalide'),
  password: Yup.string().min(6, 'Min 6 caractères').required('Mot de passe obligatoire'),
  acceptTerms: Yup.bool().oneOf([true], 'Vous devez accepter les conditions'),
});

export default function SignUpScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const openCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>LOGO</Text>
          </View>
        </View>

        <Text style={styles.title}>S'inscrire</Text>

        <Formik
          initialValues={{
            firstName: '',
            phone: '',
            password: '',
            acceptTerms: false,
          }}
          validationSchema={SignUpSchema}
          onSubmit={(values) => {
            console.log(values);
            router.replace('/');
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Nom et prénom <Text style={styles.asterisk}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  placeholder=""
                />
                {touched.firstName && errors.firstName && (
                  <Text style={{ color: 'red' }}>{errors.firstName}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  N° de téléphone <Text style={styles.asterisk}>*</Text>
                </Text>
                <View style={styles.phoneContainer}>
                  <View style={styles.countryCodeContainer}>
                    <Text style={[styles.input, styles.countryCode]}>+212</Text>
                  </View>
                  <TextInput
                    style={[styles.input, styles.phoneInput]}
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    placeholder="ex. 612345678"
                    keyboardType="phone-pad"
                  />
                </View>
                {touched.phone && errors.phone && (
                  <Text style={{ color: 'red' }}>{errors.phone}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Mot de passe <Text style={styles.asterisk}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry
                  placeholder=""
                />
                {touched.password && errors.password && (
                  <Text style={{ color: 'red' }}>{errors.password}</Text>
                )}
              </View>

              <TouchableOpacity style={styles.photoSection} onPress={openCamera}>
                {imageUri ? (
                  <Image
                    source={{ uri: imageUri }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                  />
                ) : (
                  <Text style={styles.photoText}>Prendre photo de profil</Text>
                )}
              </TouchableOpacity>

              <View style={styles.termsContainer}>
                <Switch
                  value={values.acceptTerms}
                  onValueChange={(val) => {
                    setFieldValue('acceptTerms', val);
                  }}
                  trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
                  thumbColor="#FFFFFF"
                  ios_backgroundColor="#E0E0E0"
                />
                <Text style={styles.termsText}>
                  Accepter les{' '}
                  <Text
                    style={styles.termsLink}
                    onPress={() => router.push('/(auth)/terms')}
                  >
                    termes et les conditions d'utilisation
                  </Text>
                </Text>
              </View>
              {touched.acceptTerms && errors.acceptTerms && (
                <Text style={{ color: 'red' }}>{errors.acceptTerms}</Text>
              )}

              <TouchableOpacity onPress={() => handleSubmit()} style={styles.signUpButton}>
                <Text style={styles.signUpButtonText}>S'inscrire</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoBox: {
    borderWidth: 2,
    borderColor: '#E53E3E',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  logoText: {
    color: '#E53E3E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 32,
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  asterisk: {
    color: '#E53E3E',
    fontSize: 16,
  },
  input: {
    borderWidth: 0,
    borderRadius: 20,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
    color: '#000000',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  countryCodeContainer: {
    paddingVertical: 16,
  },
  countryCode: {
    fontSize: 16,
    color: '#666666',
  },
  phoneInput: {
    flex: 1,
  },
  photoSection: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 30,
    alignItems: 'center',
    marginBottom: 32,
    borderRadius: 20,
  },
  photoText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    paddingRight: 16,
  },
  termsText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  termsLink: {
    color: '#007AFF',
  },
  signUpButton: {
    backgroundColor: '#E53E3E',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
