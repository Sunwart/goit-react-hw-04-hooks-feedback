import { useState } from 'react';

import Section from './components/Section/Section';
import Statistics from './components/Statistics/Statistics';
import FeedbackOptions from './components/FeedbackOptions/FeedbackOptions';
import Notification from './components/Notification/Notification';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const options = { good, neutral, bad };

  const handleChange = evt => {
    const temp = evt.currentTarget.textContent;

    switch (temp) {
      case 'good': {
        setGood(prev => prev + 1);
        break;
      }
      case 'neutral': {
        setNeutral(prev => prev + 1);
        break;
      }
      case 'bad': {
        setBad(prev => prev + 1);
        break;
      }
      default:
        break;
    }
  };

  const countTotalFeedback = () => {
    let total = 0;
    Object.values(options).map(value => (total += value));
    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return Math.round((good / total) * 100);
  };

  return (
    <>
      <Section title={'Please leave your feedback'}>
        <FeedbackOptions options={Object.keys(options)} onLeaveFeedback={handleChange} />
      </Section>
      <Section title={'Statistics'}>
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message={'There is no feedback'} />
        )}
      </Section>
    </>
  );
};

export default App;
