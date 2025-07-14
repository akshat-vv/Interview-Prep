const treeData = [
  // Root 1: Work Projects
  {
    id: "root1",
    label: "Work Projects",
    status: "indeterminate",
    children: [
      {
        id: "projectX",
        label: "Project X",
        status: "indeterminate",
        children: [
          {
            id: "ux",
            label: "UX Design",
            status: "indeterminate",
            children: [
              {
                id: "wireframes",
                label: "Wireframes.sketch",
                status: "checked",
              },
              {
                id: "prototype",
                label: "Prototype.fig",
                status: "unchecked",
              },
            ],
          },
          {
            id: "dev",
            label: "Development",
            status: "interminate",
            children: [
              {
                id: "frontend",
                label: "Frontend",
                status: "checked",
              },
              {
                id: "backend",
                label: "Backend",
                status: "unchecked",
              },
            ],
          },
        ],
      },
      {
        id: "projectY",
        label: "Project Y",
        status: "unchecked",
        children: [
          {
            id: "research",
            label: "Research",
            status: "unchecked",
          },
        ],
      },
    ],
  },

  // Root 2: Personal
  {
    id: "root2",
    label: "Personal",
    status: "unchecked",
    children: [
      {
        id: "finance",
        label: "Finance",
        status: "unchecked",
        children: [
          {
            id: "tax2023",
            label: "Tax 2023",
            status: "unchecked",
          },
          {
            id: "investments",
            label: "Investments",
            status: "unchecked",
          },
        ],
      },
      {
        id: "travel",
        label: "Travel Plans",
        status: "unchecked",
        children: [
          {
            id: "europe",
            label: "Europe Trip",
            status: "unchecked",
            children: [
              {
                id: "flights",
                label: "Flight Bookings",
                status: "unchecked",
              },
              {
                id: "hotels",
                label: "Hotel Reservations",
                status: "unchecked",
              },
            ],
          },
        ],
      },
    ],
  },

  // Root 3: Archived (No Children)
  {
    id: "root3",
    label: "Archived",
    status: "unchecked",
    children: [],
  },
];

export default treeData;