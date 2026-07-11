const STORAGE_KEY = "iris_organization";

class OrganizationStore {

  get() {

    return JSON.parse(

      localStorage.getItem(STORAGE_KEY)

    ) || {

      organizationName: "",

      industry: "Manufacturing",

      timezone: "Asia/Kolkata",

      country: "India",

    };

  }

  save(data) {

    localStorage.setItem(

      STORAGE_KEY,

      JSON.stringify(data)

    );

    window.dispatchEvent(

      new Event("organizationUpdated")

    );

  }

}

export default new OrganizationStore();