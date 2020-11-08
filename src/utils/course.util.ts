import Course from '../models/course.model';

class Util {
    buildCourseReturn(courses: Array<Course>) {
        return courses.map(course => {
            return {
                name: course.name,
                kind: course.kind,
                level: course.level,
                shift: course.shift,
                university: {
                    name: course.campus.university.name,
                    score: course.campus.university.score,
                    logo_url: course.campus.university.logoUrl,
                },
                campus: {
                    name: course.campus.name,
                    city: course.campus.city,
                },
            };
        });
    }
}

export const CourseUtil: Util = new Util();
