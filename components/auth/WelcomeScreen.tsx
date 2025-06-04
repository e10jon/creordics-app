import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { RecursionIcon } from "../RecursionIcon";
import { Button } from "@gluestack-ui/themed";
import { useMockAuth } from "./mock-auth-provider";

type ScreenState = "welcome" | "login" | "signup";

export function WelcomeScreen() {
  const [screen, setScreen] = useState<ScreenState>("welcome");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { login, signup, isLoading } = useMockAuth();

  const doLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login failed:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const doSignup = async () => {
    setError("");
    if (!name || !email || !password) {
      setError("Please complete all fields");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    try {
      await signup(name, email, password);
    } catch (error) {
      console.error("Signup failed:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const renderWelcomeScreen = () => (
    <View style={styles.welcomeContainer}>
      <View style={styles.welcomeContent}>
        <View style={styles.iconContainer}>
          <RecursionIcon />
        </View>
        <Text style={styles.welcomeTitle}>Welcome to Creordic</Text>
        <Text style={styles.welcomeDescription}>
          Evaluate the meaningfulness of your ideas and actions using
          philosophical factors.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button onPress={() => setScreen("login")} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Button>
        <Button onPress={() => setScreen("signup")} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Button>
      </View>

      <Text style={styles.termsText}>
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </Text>

      <View style={styles.featuresContainer}>
        <View style={styles.featuresGrid}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>C</Text>
            </View>
            <Text style={styles.featureLabel}>Compass</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>C</Text>
            </View>
            <Text style={styles.featureLabel}>Chatbot</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>N</Text>
            </View>
            <Text style={styles.featureLabel}>News</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>C</Text>
            </View>
            <Text style={styles.featureLabel}>Community</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderLoginScreen = () => (
    <View style={styles.formContainer}>
      <View style={styles.formHeader}>
        <Text style={styles.formTitle}>Sign In</Text>
        <Text style={styles.formDescription}>
          Enter your email and password to continue
        </Text>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          style={styles.input}
          autoComplete="email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          style={styles.input}
          secureTextEntry
          autoComplete="password"
        />
      </View>

      <Button onPress={doLogin} disabled={isLoading} style={styles.button}>
        <Text style={styles.buttonText}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Text>
      </Button>

      <TouchableOpacity
        onPress={() => {
          setScreen("signup");
          setError("");
        }}
        style={styles.linkContainer}
      >
        <Text style={styles.linkText}>
          Don't have an account? Create an account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setScreen("welcome");
          setError("");
        }}
        style={styles.linkContainer}
      >
        <Text style={styles.linkText}>Back to welcome</Text>
      </TouchableOpacity>

      <Text style={styles.demoText}>
        Demo credentials: demo@example.com / password
      </Text>
    </View>
  );

  const renderSignupScreen = () => (
    <View style={styles.formContainer}>
      <View style={styles.formHeader}>
        <Text style={styles.formTitle}>Create Account</Text>
        <Text style={styles.formDescription}>
          Sign up to get started with Creordic
        </Text>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          style={styles.input}
          autoComplete="name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          style={styles.input}
          autoComplete="email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Create a password"
          style={styles.input}
          secureTextEntry
          autoComplete="password"
        />
      </View>

      <Button onPress={doSignup} disabled={isLoading} style={styles.button}>
        <Text style={styles.buttonText}>
          {isLoading ? "Creating account..." : "Create Account"}
        </Text>
      </Button>

      <TouchableOpacity
        onPress={() => {
          setScreen("login");
          setError("");
        }}
        style={styles.linkContainer}
      >
        <Text style={styles.linkText}>Already have an account? Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setScreen("welcome");
          setError("");
        }}
        style={styles.linkContainer}
      >
        <Text style={styles.linkText}>Back to welcome</Text>
      </TouchableOpacity>
    </View>
  );

  const renderActiveScreen = () => {
    switch (screen) {
      case "login":
        return renderLoginScreen();
      case "signup":
        return renderSignupScreen();
      default:
        return renderWelcomeScreen();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <RecursionIcon />
        </View>
        <Text style={styles.headerTitle}>Creordic</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {renderActiveScreen()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerIcon: {
    position: "absolute",
    left: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeContainer: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  welcomeContent: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  welcomeDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
    marginBottom: 16,
  },
  button: {
    width: "100%",
    marginVertical: 8,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  termsText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
  },
  featuresContainer: {
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 32,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  featureItem: {
    alignItems: "center",
    width: "22%",
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  featureIconText: {
    fontSize: 16,
    color: "#666",
  },
  featureLabel: {
    fontSize: 12,
    color: "#666",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
  },
  formHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  formDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  errorContainer: {
    backgroundColor: "#fee2e2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "#dc2626",
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  linkContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  linkText: {
    fontSize: 14,
    color: "#666",
  },
  demoText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 32,
  },
});
