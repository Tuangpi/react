import * as React from "react";
import Button from "@mui/material/Button";
import ErrorIcon from "@mui/icons-material/Report";
import History from "@mui/icons-material/History";
import { Title, useTranslate } from "react-admin";
import { useLocation } from "react-router-dom";

export const MyError = ({ error, resetErrorBoundary, ...rest }) => {
  const { pathname } = useLocation();
  const originalPathname = React.useRef(pathname);

  // Effect that resets the error state whenever the location changes
  React.useEffect(() => {
    if (pathname !== originalPathname.current) {
      resetErrorBoundary();
    }
  }, [pathname, resetErrorBoundary]);

  const translate = useTranslate();
  return (
    <div>
      <Title title="Error" />
      <h1>
        <ErrorIcon /> Something Went Wrong{" "}
      </h1>
      <div>A client error occurred and your request couldn't be completed.</div>
      {process.env.NODE_ENV !== "production" && (
        <details>
          <h2>{translate(error.toString())}</h2>
        </details>
      )}
      <div>
        <Button
          variant="contained"
          startIcon={<History />}
          onClick={() => window.location.history.go(-1)}
        >
          Back
        </Button>
      </div>
    </div>
  );
};
