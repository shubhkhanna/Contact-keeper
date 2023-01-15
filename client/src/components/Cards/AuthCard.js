import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../Button";
import InputField from "../InputField";
import { Icons, Strings } from "../../utils/globals";
import { AppRoutes } from "../../utils/routes";

const AuthCard = ({
  authType,
  title,
  subtitle,
  buttonText,
  initialValues,
  validationSchema,
}) => {
  const dispatch = useDispatch();

  // submit handler
  const onSubmit = (values) => {
    if (authType === Strings.signin) {
      const { email, password } = values;
      console.log(values);
      // dispatch(signinUser({ email, password }));
    } else {
      const { name, email, password } = values;
      console.log(values);
    }
  };

  // formik hook for authentication form
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md px-5 py-7 mt-4 w-full max-w-md">
      <h1 className="text-2xl font-medium text-sky-800">{title}</h1>
      <p className="text-sm font-medium text-slate-400 mt-2 text-center">
        {subtitle}
      </p>

      <form
        className="w-full px-3 md:px-6"
        onSubmit={handleSubmit}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
      >
        {authType === Strings.signup && (
          <>
            <InputField
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={Strings.namePlaceholder}
              inputStyles={"mt-10"}
              icon={Icons.name}
              error={errors.name && touched.name}
            />

            {errors.name && touched.name && (
              <p className="text-sm text-red-500 mt-2">{errors.name}</p>
            )}
          </>
        )}

        <InputField
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={Strings.emailPlaceholder}
          inputStyles={"mt-10"}
          icon={Icons.email}
          error={errors.email && touched.email}
        />
        {errors.email && touched.email && (
          <p className="text-sm text-red-500 mt-2">{errors.email}</p>
        )}

        <InputField
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={Strings.passwordPlaceholder}
          icon={Icons.password}
          error={errors.password && touched.password}
        />
        {errors.password && touched.password && (
          <p className="text-sm text-red-500 mt-2">{errors.password}</p>
        )}

        {/* CTA Button */}
        <Button
          type="submit"
          styles={"mt-5"}
          disabled={isSubmitting}
          buttonText={buttonText}
        />
      </form>

      <p className="text-sm text-gray-400 mt-4">
        {authType === Strings.signin
          ? Strings.signinRedirect
          : Strings.signupRedirect}{" "}
        <Link
          to={authType === Strings.signin ? AppRoutes.signup : AppRoutes.signin}
          className="text-blue-600 font-medium hover:underline cursor-pointer"
        >
          {authType === Strings.signin ? Strings.signup : Strings.signin}
        </Link>
      </p>
    </div>
  );
};

export default AuthCard;
