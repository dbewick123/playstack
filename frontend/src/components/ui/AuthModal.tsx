import "./authModal.css";
import { useState, useEffect } from "react";
import isEmail from "validator/lib/isEmail";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  loginUser,
  signupUser,
  selectUserLoading,
  selectIsLoggedIn,
} from "../../store/slices/userSlice";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

interface FieldErrors {
  username?: string;
  email?: string;
  password?: string;
}

function AuthModal({ open, onClose }: AuthModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectUserLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formErrors, setFormErrors] = useState<string[]>([]);

  useEffect(() => {
    if (isLoggedIn) {
      resetForm();
      onClose();
    }
  }, [isLoggedIn]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setFieldErrors({});
    setFormErrors([]);
  };

  const handleTabChange = (
    _: React.SyntheticEvent,
    value: "login" | "signup",
  ) => {
    setActiveTab(value);
    resetForm();
  };

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    if (activeTab === "signup" && !username.trim())
      errors.username = "Username is required";
    if (!email.trim()) errors.email = "Email is required";
    else if (!isEmail(email))
      errors.email = "Please enter a valid email address";
    if (!password.trim()) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setFormErrors([]);

    if (activeTab === "login") {
      const result = await dispatch(loginUser({ email, password }));
      if (loginUser.rejected.match(result)) {
        setFormErrors([result.payload as string]);
      }
    } else {
      const result = await dispatch(signupUser({ username, email, password }));
      if (signupUser.rejected.match(result)) {
        const fields = result.payload as { field: string; message: string }[];
        setFormErrors(fields.map((f) => f.message));
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        resetForm();
        onClose();
      }}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle className="auth-modal-title">
        {activeTab === "login" ? "Welcome back" : "Create an account"}
      </DialogTitle>
      <DialogContent>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          className="auth-modal-tabs"
        >
          <Tab label="Login" value="login" />
          <Tab label="Sign up" value="signup" />
        </Tabs>
        <form onSubmit={handleSubmit} className="auth-modal-form">
          {activeTab === "signup" && (
            <div className="auth-modal-field">
              <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                size="small"
              />
              {fieldErrors.username && (
                <div className="auth-modal-error">{fieldErrors.username}</div>
              )}
            </div>
          )}
          <div className="auth-modal-field">
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            size="small"
          />
          {fieldErrors.email && (
            <div className="auth-modal-error">{fieldErrors.email}</div>
          )}
          </div>
          <div className="auth-modal-field">
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            size="small"
          />
          {fieldErrors.password && (
            <div className="auth-modal-error">{fieldErrors.password}</div>
          )}
          </div>
          {formErrors.length > 0 && (
            <div className="auth-modal-form-errors">
              {formErrors.map((msg, i) => (
                <div key={i} className="auth-modal-error">
                  {msg}
                </div>
              ))}
            </div>
          )}
          <Button
            type="submit"
            variant="contained"
            color="playstackAction"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : activeTab === "login" ? (
              "Login"
            ) : (
              "Create account"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
