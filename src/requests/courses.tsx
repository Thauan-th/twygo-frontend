import apiClient from "@/lib/api_client";
import endpoints from "@/lib/endpoints";

const { courses: coursesEndpoints } = endpoints;

export const createCourse = async (course: any) => {};

export const getCourses = async () => {
  const response = await apiClient.get(coursesEndpoints.index);
  const { results } = response.data;
  return results;
};

export const getCourse = async (id: string) => {};

export const updateCourse = async (id: string, course: any) => {};

export const deleteCourse = async (id: string) => {};
