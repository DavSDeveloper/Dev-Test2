import { useFormik } from "formik";
import { TOKEN_AUTH } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [tokenAuth, { loading, error }] = useMutation(TOKEN_AUTH);
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const { data } = await tokenAuth({ variables: values });
        if (data.tokenAuth.token) {
          login(data.tokenAuth.token);
          navigate("/companies");
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <form
      className="min-h-screen flex justify-center items-center"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col border-4 bg-slate-50 border-blue-400 p-4 w-80 rounded-lg">
        <h2 className="flex justify-center my-4 text-blue-400 text-2xl font-bold">
          Login
        </h2>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="border-2 border-slate-400 rounded-md p-2 my-5"
          placeholder="usuario@example.com"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="border-2 border-slate-400 rounded-md p-2 my-5"
          placeholder="*********"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-700 duration-300"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && (
          <p className="text-red-600 text-sm mt-2 font-bold">
            Error: {error.message}
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
