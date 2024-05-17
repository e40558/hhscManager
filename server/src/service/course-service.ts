import { AppDataSource } from "../data-source";
import { Course } from "../models/course";
import { Lesson } from "../models/lesson";



  export async function findAll() {
   
    const courses = await AppDataSource
            .getRepository(Course)
            .createQueryBuilder("courses")
            .orderBy("courses.seqNo")
            .getMany();
    return courses;
  }

  export async function  findCourseByUrl(courseUrl: string){
    const course = await AppDataSource
    .getRepository(Course)
    .findOneBy({
        url: courseUrl
    });
    return course;
  }

  export async function  updateCourse(courseId: string, changes: Partial<Course>){
    await AppDataSource
            .createQueryBuilder()
            .update(Course)
            .set(changes)
            .where("id = :courseId", {courseId})
            .execute();
    return courseId;
  }

  export async function deleteCourse(courseId: string) {
    await AppDataSource.manager.transaction(
        async (transactionalEntityManager) => {

            await transactionalEntityManager
                .createQueryBuilder()
                .delete()
                .from(Lesson)
                .where("courseId = :courseId", {courseId})
                .execute();

            await transactionalEntityManager
                .createQueryBuilder()
                .delete()
                .from(Course)
                .where("id = :courseId",{courseId})
                .execute();
        }
    );
    return  courseId;
  }

  export async function addCourse(data:any) {

    const course = await AppDataSource.manager.transaction(
        "REPEATABLE READ",
          async (transactionalEntityManager) => {

            const repository = transactionalEntityManager.getRepository(Course);

            const result = await repository
                .createQueryBuilder("courses")
                .select("MAX(courses.seqNo)", "max")
                .getRawOne();

            const course = repository
                .create({
                    ...data,
                    seqNo: ( result?.max ?? 0 ) + 1
                });

            await repository.save(course);

            return course;
          }
      );


    
  }

