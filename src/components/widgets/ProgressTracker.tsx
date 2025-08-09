const ProgressTracker = ({ currentStep=3 }: { currentStep: number }) => {
  return (
    <div className='mb-8'>
      <div className='flex justify-between items-center'>
        {[1, 2, 3].map((step) => (
          <div key={step} className='flex items-center'>
            <div
              className={`w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center ${
                currentStep >= step
                  ? 'bg-primary text-red-500'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step}
            </div>
            {step < 3 && (
              <div
                className={`h-1 w-16 md:w-32 ${
                  currentStep > step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
