import { useState } from "react";
import { registerUser } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.error ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-6 shadow-lg rounded-lg"
      >
        <h2 className="text-3xl font-bold mb-4">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <button
          className="bg-blue-500 text-white p-2 w-full"
        >
          Register
        </button>

        <p className="mt-4">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-500 ml-1"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;