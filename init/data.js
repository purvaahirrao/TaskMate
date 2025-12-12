const tasks = [
  {
    title: "Complete MongoDB Assignment",
    image: {
      filename: "mongo_task_1.jpg",
      url: "https://images.unsplash.com/photo-1556155092-8707de31f9c4?auto=format&fit=crop&w=800&q=80"
    },
    duedate: new Date("2025-11-12"), // Date object
    completed: false
  },
  {
    title: "Build Task Manager UI",
    image: {
      filename: "task_ui_2.png",
      url: "https://images.unsplash.com/photo-1581093588401-22e8d2055646?auto=format&fit=crop&w=800&q=80"
    },
    duedate: new Date("2025-11-14"),
    completed: true
  },
  {
    title: "Fix Login Authentication",
    image: {
      filename: "auth_fix_3.jpg",
      url: "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?auto=format&fit=crop&w=800&q=80"
    },
    duedate: new Date("2025-11-10"),
    completed: false
  },
  {
    title: "Add Profile Page Feature",
    image: {
      filename: "profile_feature_4.png",
      url: "https://images.unsplash.com/photo-1612831455543-44d1b1e8b11e?auto=format&fit=crop&w=800&q=80"
    },
    duedate: new Date("2025-11-15"),
    completed: false
  },
  {
    title: "Deploy App on Render",
    image: {
      filename: "deploy_task_5.png",
      url: "https://images.unsplash.com/photo-1605902711622-cfb43c4437f0?auto=format&fit=crop&w=800&q=80"
    },
    duedate: new Date("2025-11-18"),
    completed: true
  }
];

module.exports = { data: tasks };