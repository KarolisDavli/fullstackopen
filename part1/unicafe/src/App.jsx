import {useState} from "react";

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  return (
    <>
      <h2>statistics</h2>
      {props.all === 0 ? (
        <p>no feedback</p>
      ) : (
        <>
          <table>
            <tbody>
              <StatisticLine text={"good"} value={props.good} />
              <StatisticLine text={"neutral"} value={props.neutral} />
              <StatisticLine text={"bad"} value={props.bad} />
              <StatisticLine text={"all"} value={props.all} />
              <StatisticLine text={"average"} value={props.averageScoreCount} />
              <StatisticLine
                text={"positive"}
                value={props.positivePercentage}
              />
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  const feedback = (rating) => {
    const handler = () => {
      switch (rating) {
        case "good":
          setGood(good + 1);
          setAll(all + 1);
          setAverageScore(averageScore + 1);
          break;
        case "neutral":
          setNeutral(neutral + 1);
          setAll(all + 1);
          break;
        case "bad":
          setBad(bad + 1);
          setAll(all + 1);
          setAverageScore(averageScore - 1);
          break;
      }
    };
    return handler;
  };

  const averageScoreCount = all !== 0 ? averageScore / all : 0;
  const positivePercentage = (partialValue, totalValue) =>
    totalValue ? `${(100 * partialValue) / totalValue}%` : "0%";

  return (
    <>
      <h2>give feedback</h2>
      <Button onClick={feedback("good")} text={"good"} />
      <Button onClick={feedback("neutral")} text={"neutral"} />
      <Button onClick={feedback("bad")} text={"bad"} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        averageScoreCount={averageScoreCount}
        positivePercentage={positivePercentage(good, all)}
      />
    </>
  );
}

export default App;
