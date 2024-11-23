import apiClient from "@/lib/api_client";
import { Course } from "@/types";

const coursesEndpoints = {
  index: "/courses",
  create: "/courses",
  show: (slug: string) => `/courses/${slug}`,
  update: (slug: string) => `/courses/${slug}`,
  delete: (slug: string) => `/courses/${slug}`,
};

export const createCourse = async (course: Course) => {
  const response = await apiClient.post(coursesEndpoints.create, course);
  return response.data;
};

export const getCourses = async () => {
  const response = await apiClient.get(coursesEndpoints.index);
  const { results } = response.data;
  return results;
};

export const getCourse = async (slug: string, params = '') => {
  const response = await apiClient.get(coursesEndpoints.show(slug) + `?${params}`);
  return response.data;
};

export const updateCourse = async (slug: string, course: Course) => {
  const response = await apiClient.put(coursesEndpoints.update(slug), course);
  return response.data;
};

export const deleteCourse = async (slug: string) => {
  const response = await apiClient.delete(coursesEndpoints.delete(slug));
  return response.data;
};
