onSubmit: async (values) => {
  setIsLoading(true);
  
  try {
    console.log("Submitting registration:", values);
    
    // Register the user
    await register(values);
    
    console.log("Registration successful");
    
    // Auto-redirect based on role
    if (values.role === "Customer") {
      toast.success(`Welcome ${values.firstName}! Start exploring our products.`, {
        position: "top-right",
        autoClose: 2000,
      });
      
      setTimeout(() => {
        navigate("/", { replace: true });
        window.location.reload(); // Refresh to update navbar state
      }, 500);
    } else {
      toast.success("Account created successfully! Please login to access your dashboard.", {
        position: "top-right",
        autoClose: 3000,
      });
      
      navigate("/login", { replace: true });
    }
  } catch (error) {
    console.error("Registration error:", error);
    
    toast.error(error?.message || "Registration failed. Please try again.", {
      position: "top-right",
      autoClose: 3000,
    });
  } finally {
    setIsLoading(false);
  }
},



