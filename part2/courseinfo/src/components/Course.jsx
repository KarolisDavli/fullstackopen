const Header = ({course}) => <h1>{course}</h1>;
const Part = ({name, exercises}) => (
  <p>
    {name} {exercises}
  </p>
);

const Total = ({total}) => (
  <p>
    <strong>total of {total} exercises</strong>
  </p>
);

const Course = ({course}) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <>
      <Header course={course.name} />
      {course.parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <Total total={total} />
    </>
  );
};

export default Course;
