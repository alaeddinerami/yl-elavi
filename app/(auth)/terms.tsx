import { router } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function TermsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>LOGO</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.backLinkContainer}>
          <Text style={styles.backLink} onPress={()=>router.back()}>Vers page d'accueil</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Conditions générales</Text>
        
        <Text style={styles.subtitle}>
          Please read these terms and conditions carefully before using Our Service.
        </Text>

        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Interpretation and Definitions</Text>
          
          <Text style={styles.subsectionTitle}>Interpretation</Text>
          <Text style={styles.contentText}>
            The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
          </Text>

          <Text style={styles.subsectionTitle}>Definitions</Text>
          <Text style={styles.contentText}>
            For the purposes of these Terms and Conditions:
          </Text>
          
          <Text style={styles.contentText}>
            Application means the software program provided by the Company downloaded by You on any electronic device, named MyTestApp
          </Text>
          
          <Text style={styles.contentText}>
            Application Store means the digital distribution service operated and developed by Apple Inc. (Apple App Store) or Google Inc. (Google Play Store) in which the Application has been downloaded.
          </Text>
          
          <Text style={styles.contentText}>
            Affiliate means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election
          </Text>
          
          <Text style={styles.contentText}>
            Terms and Conditions (alsoeferred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service. This Terms and Conditions agreement has been created with the help of the Terms and Conditions Generator.   Third-party Social Media Service means any services or content (including data, information, products or services) provided by a third-
          </Text>
        </View>
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
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
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
  backLinkContainer: {
    marginBottom: 20,
  },
  backLink: {
    color: '#007AFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 24,
    lineHeight: 20,
  },
  contentContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E53E3E',
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
    marginTop: 8,
  },
  contentText: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
    marginBottom: 16,
    textAlign: 'justify',
  },
});