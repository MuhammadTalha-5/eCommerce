import React, {useEffect} from 'react';
import LoadingBar from 'react-top-loading-bar';

function TopLoadingBar() {


    
    /*  Loading Bar */
  const [progress, setProgress] = React.useState(0);
  useEffect(() => {
    let interval;
    const simulateLoading = () => {
      // Simulate a gradual increase in loading progress
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 30;
          // If loading is complete (100%), clear the interval
          if (newProgress >= 100) {
            clearInterval(interval);
          }
          return newProgress;
        });
      }, 0.005); // Adjust the interval duration as needed
    };

    // Start simulating loading when the component mounts
    simulateLoading();

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <LoadingBar
              height={3}
              color="#f11946"
              progress={progress}
              onLoaderFinished={() => setProgress(0)}
          />
  )
}

export default TopLoadingBar;
