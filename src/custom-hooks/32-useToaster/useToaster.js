// context

// import { toast } from 'react-toastify';

// export function useToaster() {
//   const toastError = (error = {}, setError = () => {}, options = {}) => {
//     if (error.validations) {
//       Object.keys(error.validations).forEach((fieldName) => {
//         setError(fieldName, {
//           type: 'server',
//           message: error.validations[fieldName],
//         });
//       });
//     }
//     return toast.error(`${error?.msg}`, options);
//   };

//   const toastSuccess = (message = '', options = {}) => {
//     return toast.success(message, options);
//   };

//   return { toastError, toastSuccess };
// }

import { toast } from "react-toastify";

export const toastNotification = ({
  title,
  body,
  icon,
  onClick,
  options = {},
}) => {
  // Specify the position option (default to 'top-right' if not provided)

  return toast.info(
    <a href={onClick} style={{ color: "black" }}>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        {icon && (
          <img
            src={icon}
            alt=""
            style={{ width: "30px", height: "30px", borderRadius: "30px" }}
          ></img>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <p style={{ fontSize: "16px", fontWeight: 600 }}>{title}</p>
          <p style={{ fontSize: "13px" }}> {body}</p>
        </div>
      </div>
    </a>,
    options
  );
};

export function useToaster() {
  const toastError = (error = {}, setError = () => {}, options = {}) => {
    if (error.validations) {
      Object.keys(error.validations).forEach((fieldName) => {
        setError(fieldName, {
          type: "server",
          message: error.validations[fieldName],
        });
      });
    }

    // Specify the position option (default to 'top-right' if not provided)

    return toast.error(`${error?.msg}`, {
      ...options, // Include other options
    });
  };

  const toastSuccess = (message = "", options = {}) => {
    // Specify the position option (default to 'top-right' if not provided)

    return toast.success(message, {
      ...options, // Include other options
    });
  };

  return { toastError, toastSuccess, toastNotification };
}
