import React, { useState } from "react";
import "../styles/Sidebar.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  expertiseOptions,
  locationOptions,
  industries,
  categories,
} from "../constants";

const Sidebar = ({ onApplyFilters }) => {
  const [openCategories, setOpenCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [openIndustries, setOpenIndustries] = useState(false);
  const [openSubCategories, setOpenSubCategories] = useState(
    Object.keys(industries).reduce((acc, category) => {
      acc[category] = false; // Initialize each category as closed (false)
      return acc;
    }, {})
  );
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [openExpertise, setOpenExpertise] = useState(false);
  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const [openLocation, setOpenLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");

  const location = useLocation();

  const handleCategoriesClick = () => {
    setOpenCategories(!openCategories);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleIndustriesClick = () => {
    setOpenIndustries(!openIndustries);
  };

  // Handle toggle for each category (e.g., "Technology")
  const handleCategoryToggle = (category) => {
    setOpenSubCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Handle checkbox toggle
  const handleIndustryToggle = (subCategory) => {
    const currentIndex = selectedIndustries.indexOf(subCategory);
    const newSelected = [...selectedIndustries];

    if (currentIndex === -1) {
      newSelected.push(subCategory); // Add if not selected
    } else {
      newSelected.splice(currentIndex, 1); // Remove if already selected
    }

    setSelectedIndustries(newSelected);
  };

  const handleExpertiseClick = () => {
    setOpenExpertise(!openExpertise);
  };

  const handleExpertiseSelect = (expertise) => {
    const currentIndex = selectedExpertise.indexOf(expertise);
    const newSelected = [...selectedExpertise];

    if (currentIndex === -1) {
      newSelected.push(expertise); // Add if not selected
    } else {
      newSelected.splice(currentIndex, 1); // Remove if already selected
    }

    setSelectedExpertise(newSelected);
  };

  const handleLocationClick = () => {
    setOpenLocation(!openLocation);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleApplyFiltersClick = async () => {
    const newFilters = {
      location: selectedLocation,
      industries: selectedIndustries,
      expertise: selectedExpertise,
      category: selectedCategory,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/getFilteredProfiles", newFilters);
      onApplyFilters(response.data);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const areFiltersApplied = () => {
    // Check if at least one filter is applied
    return (
      selectedLocation !== "" || // Check location
      selectedIndustries.length > 0 || // Check industries
      selectedExpertise.length > 0 || // Check expertise
      selectedCategory !== "" // Check category
    );
  };

  if (location.pathname === "/profile") {
    return null; // Do not render the sidebar on the profile page
  }

  return (
    <Box className="sidebar">
      <Typography variant="h6" className="sidebar-title">
        Filters
      </Typography>

      {/* Categories Section */}
      <List>
        <ListItem button onClick={handleCategoriesClick}>
          <ListItemText primary="Categories" sx={{ fontWeight: "bold" }} />
          {openCategories ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCategories} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {categories.map((category) => (
              <ListItem
                button
                key={category}
                onClick={() => handleCategorySelect(category)}
              >
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>

      {/* Display selected category */}
      {selectedCategory && (
        <Typography variant="body1" className="selected-category">
          Selected Category: {selectedCategory}
        </Typography>
      )}

      <div className="horizontal-line"></div>

      {/* Industries Section */}
      <List>
        <ListItem button onClick={handleIndustriesClick}>
          <ListItemText primary="Industries" />
          {openIndustries ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        {/* Expandable list of categories when "Industries" is clicked */}
        <Collapse in={openIndustries} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {Object.keys(industries).map((category) => (
              <React.Fragment key={category}>
                <ListItem button onClick={() => handleCategoryToggle(category)}>
                  <ListItemText primary={category} />
                  {openSubCategories[category] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItem>

                {/* Subcategories with checkboxes */}
                <Collapse
                  in={openSubCategories[category]}
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
                            selectedIndustries.indexOf(subCategory) !== -1
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
      </List>

      <div className="horizontal-line"></div>

      {/* Expertise Section */}

      <List>
        <ListItem button onClick={handleExpertiseClick}>
          <ListItemText primary="Expertise" />
          {openExpertise ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openExpertise} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {expertiseOptions.map((expertise) => (
              <ListItem
                key={expertise}
                button
                onClick={() => handleExpertiseSelect(expertise)}
              >
                <Checkbox
                  checked={selectedExpertise.indexOf(expertise) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={expertise} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>

      <div className="horizontal-line"></div>

      {/* Location Section */}

      <List>
        <ListItem button onClick={handleLocationClick}>
          <ListItemText primary="Location" />
          {openLocation ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openLocation} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem>
              <FormControl fullWidth>
                <InputLabel
                  id="location-label"
                  className="location-label"
                  sx={{
                    marginBottom: "8px",
                    position: "absolute",
                    top: "-10px",
                    left: "12px",
                    fontSize: "14px",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  Select Location
                </InputLabel>
                <Select
                  labelId="location-label"
                  value={selectedLocation}
                  onChange={handleLocationChange}
                >
                  {locationOptions.map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
          </List>
        </Collapse>
      </List>

      <Button
        variant="contained"
        style={{
          marginTop: "16px",
          background: "#4e54c6",
          marginLeft: "57px",
          padding: "15px",
        }}
        onClick={handleApplyFiltersClick}
        disabled={!areFiltersApplied()}
      >
        Apply Filters
      </Button>
    </Box>
  );
};

export default Sidebar;
