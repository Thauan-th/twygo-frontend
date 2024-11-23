export type Course = {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  image: string | File;
  lessons: Lesson[];
};

export type Lesson = {
  title: string;
  description: string;
  video_url: string;
  course_id: number;
}