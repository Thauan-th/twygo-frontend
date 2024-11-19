export default {
  courses: {
    index: "/courses",
    create: "/courses",
    show: (id: string) => `/courses/${id}`,
    update: (id: string) => `/courses/${id}`,
    delete: (id: string) => `/courses/${id}`,
  }
}