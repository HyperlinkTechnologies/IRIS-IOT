import {
  useEffect,
  useState,
} from "react";

export default function useProfile() {

  const [profile, setProfile] =
    useState({

      username: "User",

      email: "",

      bio: "",

      image: "",
    });

  useEffect(() => {

    const loadProfile = () => {

      const savedProfile =
        localStorage.getItem(
          "iris_profile"
        );

      if (savedProfile) {

        setProfile(
          JSON.parse(savedProfile)
        );
      }
    };

    loadProfile();

    window.addEventListener(
      "profileUpdated",
      loadProfile
    );

    return () => {

      window.removeEventListener(
        "profileUpdated",
        loadProfile
      );
    };

  }, []);

  return profile;
}