import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

const Profile = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("jwtToken"); // Retrieve token
        const response = await axios.get(
          "http://localhost:8080/api/getProfile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        // console.log("Data fetched:", response.data); // Log fetched data
      } catch (error) {
        console.error("Error fetching profile data:", error); // Log any errors
      }
    };

    fetchProfileData();
  }, []);

  const {
    fullName = "",
    category = "",
    industries = [],
    expertise = [],
    stages = [],
    languages = [],
    location = "",
    profileImage = "",
  } = data;

  return (
    <Box
      sx={{
        backgroundColor:"#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px",
        minHeight: "100vh",
        marginTop: "70px",
      }}
    >
      {/* Profile Image */}
      <Avatar
        src={
          profileImage
            ? `http://localhost:8080/api/profileImage/${profileImage
                .split("/")
                .pop()}`
            : "https://via.placeholder.com/80"
        }
        alt="Profile"
        sx={{
          width: 180,
          height: 180,
          marginBottom: "20px",
          border: "3px solid #007bff",
        }}
      />

      {/* Name */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", marginTop: "3px" }}
      >
        {fullName}
      </Typography>

      {/* Card for Profile Details */}
      <Card
        sx={{
          maxWidth: 800,
          width: "100%",
          padding: "20px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          backgroundColor: "#ffffff",
          marginTop: "4px",
        }}
      >
        <CardContent>
          {/* Category */}
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#4e54c6", fontWeight: "bold", mt: 2 }}
          >
            Category
          </Typography>
          <Typography variant="body1">{category}</Typography>
          <Divider />

          {/* Industry */}
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#4e54c6", fontWeight: "bold", mt: 2 }}
          >
            Industry
          </Typography>
          <Typography variant="body1">
            {data && data.industries
              ? data.industries.join(", ")
              : "No industries available"}
          </Typography>

          <Divider />

          {/* Expertise */}
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#4e54c6", fontWeight: "bold", mt: 2 }}
          >
            Expertise
          </Typography>
          <Typography variant="body1">{expertise.join(", ")}</Typography>
          <Divider />

          {/* Stages */}
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#4e54c6", fontWeight: "bold", mt: 2 }}
          >
            Stages
          </Typography>
          <Typography variant="body1">{stages.join(", ")}</Typography>
          <Divider />

          {/* Languages */}
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#4e54c6", fontWeight: "bold", mt: 2 }}
          >
            Languages
          </Typography>
          <Typography variant="body1">{languages.join(", ")}</Typography>
          <Divider />

          {/* Location */}
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#4e54c6", fontWeight: "bold", mt: 2 }}
          >
            Location
          </Typography>
          <Typography variant="body1">{location}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
