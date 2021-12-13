import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";

import { useNotification } from "../utils/useNotification";
import { useAsync } from "../utils/useAsync";

export const Form = () => {
  const { failureNotification, successNotification } = useNotification();
  const [formData, setformData] = useState({});
  const [all, setAll] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setAll([...all, formData]);
    const { loading, error, data } = useAsync(
      "http://localhost:3001",
      formData
    );
    if (error) {
      failureNotification(error, 2000);
    } else {
      successNotification("successfully post", 2000);
    }
  };

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 }
            }}
            noValidate
            autoComplete="off"
          >
            <Input
              onChange={(e) => {
                handleChange(e);
              }}
              type="text"
              name="first_name"
              placeholder="Enter your firstname"
            />
            <br />
            <Input
              onChange={(e) => {
                handleChange(e);
              }}
              type="text"
              name="last_name"
              placeholder="Enter your last name"
            />{" "}
            <br />
            <Input
              onChange={(e) => {
                handleChange(e);
              }}
              type="text"
              name="email"
              placeholder="Enter your email"
            />{" "}
            <br />
            <Input
              onChange={(e) => {
                handleChange(e);
              }}
              type="text"
              name="number"
              placeholder="Enter your number"
            />
            <br />
          </Box>
        </CardContent>

        <Button onClick={handleSubmit} size="large">
          submit
        </Button>
      </Card>

      <div>
        {all.map((e, i) => (
          <div key={i}>
            <h2>
              {" "}
              name : {e.first_name} {e.last_name}
            </h2>
            <p>email : {e.email}</p>
            <p>phone : {e.number} </p>
          </div>
        ))}
      </div>
    </div>
  );
};
