import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  Typography,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Grid,
  Button,
  List,
  ListItem,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const categories = ["Mentor", "Investor", "Cofounder"];
const expertiseOptions = [
  "Product Management",
  "AI/ML",
  "Finance",
  "Software Development",
  "Data Science",
];
const industries = {
  Technology: ["Software Development", "AI", "Cloud Computing"],
  Healthcare: ["Biotech", "Pharmaceuticals", "Digital Health"],
  Finance: ["FinTech", "Investment Banking", "Venture Capital"],
  Energy: ["Renewable Energy", "Oil", "Gas"],
  Education: ["EdTech", "K-12", "Higher Education"],
};
const stages = ["Idea/Concept Stage", "Seed Stage", "Growth Stage"];
const languages = ["English", "Spanish", "Mandarin", "Hindi"];

const ProfileForm = () => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    category: "",
    expertise: [],
    industries: [],
    stages: [],
    location: "",
    description: "",
    languages: [],
    profileImage: null,
  });
  const [openIndustries, setOpenIndustries] = useState(false);
  const [openCategories, setOpenCategories] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleMultiSelectChange = (event, name) => {
    const { value } = event.target;
    setFormValues({
      ...formValues,
      [name]: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setFormValues({ ...formValues, profileImage: file }); // Update form values with the selected image
      setImagePreview(URL.createObjectURL(file)); // Generate image preview URL
    }
  };

  const handleIndustriesClick = () => {
    setOpenIndustries(!openIndustries);
  };

  // Handle checkbox toggle and update formValues
  const handleIndustryToggle = (subCategory) => {
    const currentIndex = formValues.industries.indexOf(subCategory);
    const newSelected = [...formValues.industries];

    if (currentIndex === -1) {
      newSelected.push(subCategory); // Add if not selected
    } else {
      newSelected.splice(currentIndex, 1); // Remove if already selected
    }

    setFormValues({ ...formValues, industries: newSelected });
  };

  // Handle toggle for each category (e.g., "Technology")
  const handleCategoryToggle = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
console.log(formValues);

    const data = new FormData();

    // Append other form values
    for (const key in formValues) {
      data.append(key, formValues[key]);
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/createProfile",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Profile created:", response.data);
      navigate('/');

    } catch (error) {
      console.error(
        "Error creating profile:",
        error.response ? error.response.data : error.message
      );
    }
  };

  
  console.log(formValues);

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#f6f6fc",
        padding: "80px",
        borderRadius: "20px",
        marginTop: "100px",
        width: "900px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginTop: "5px",
          marginBottom: "30px",
          textAlign: "center",
          fontWeight: "300",
          color: "#333",
        }}
      >
        Fill this form
      </Typography>
      <Grid container spacing={2}>
        {/* Full Name */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formValues.fullName}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Category */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formValues.category}
              onChange={handleChange}
              required
            >
              {categories.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Expertise */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Expertise</InputLabel>
            <Select
              multiple
              name="expertise"
              value={formValues.expertise}
              onChange={(event) => handleMultiSelectChange(event, "expertise")}
              input={<OutlinedInput label="Expertise" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {expertiseOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox
                    checked={formValues.expertise.indexOf(option) > -1}
                  />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Industries Section */}
        <FormControl fullWidth>
          <TextField
            sx={{
              marginTop: "16px",
              marginLeft: "11px",
              padding: "4px", // Apply padding
              borderRadius: "8px", // Example of border radius
            }}
            label="Industries"
            value={formValues.industries.join(", ") || ""}
            onClick={handleIndustriesClick}
            readOnly
            variant="outlined"
            InputProps={{
              endAdornment: openIndustries ? <ExpandLess /> : <ExpandMore />,
            }}
          />
          <Collapse in={openIndustries} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {Object.keys(industries).map((category) => (
                <React.Fragment key={category}>
                  <ListItem
                    button
                    onClick={() => handleCategoryToggle(category)}
                  >
                    <ListItemText primary={category} />
                    {openCategories[category] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>

                  {/* Subcategories with checkboxes */}
                  <Collapse
                    in={openCategories[category]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {industries[category].map((subCategory) => (
                        <ListItem
                          key={subCategory}
                          button
                          onClick={() => handleIndustryToggle(subCategory)}
                        >
                          <Checkbox
                            checked={
                              formValues.industries.indexOf(subCategory) !== -1
                            }
                            tabIndex={-1}
                            disableRipple
                          />
                          <ListItemText primary={subCategory} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              ))}
            </List>
          </Collapse>
        </FormControl>

        {/* Stages */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Stages</InputLabel>
            <Select
              multiple
              name="stages"
              value={formValues.stages}
              onChange={(event) => handleMultiSelectChange(event, "stages")}
              input={<OutlinedInput label="Stages" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {stages.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={formValues.stages.indexOf(option) > -1} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Location */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formValues.location}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* description */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Languages */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Languages</InputLabel>
            <Select
              multiple
              name="languages"
              value={formValues.languages}
              onChange={(event) => handleMultiSelectChange(event, "languages")}
              input={<OutlinedInput label="Languages" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {languages.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox
                    checked={formValues.languages.indexOf(option) > -1}
                  />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Profile Image */}
        <Grid item xs={12} container justifyContent="center">
          <Button variant="contained" component="label">
            Upload Profile Image
            <input
              type="file"
              name="profileImage"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        </Grid>

        {/* Image Preview */}
        {imagePreview && (
          <Grid item xs={12} container justifyContent="center">
            <img
              src={imagePreview}
              alt="Profile Preview"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                marginTop: "10px",
              }}
            />
          </Grid>
        )}

        {/* Submit Button */}
        <Grid item xs={12} container justifyContent="center">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfileForm;
