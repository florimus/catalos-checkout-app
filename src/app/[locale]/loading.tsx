export default function Loading() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="flex space-x-2">
          <span className="w-4 h-4 bg-primary rounded-full animate-bounce"></span>
          <span className="w-4 h-4 bg-primary rounded-full animate-bounce [animation-delay:-0.2s]"></span>
          <span className="w-4 h-4 bg-primary rounded-full animate-bounce [animation-delay:-0.4s]"></span>
        </div>
        <p className="mt-4 text-primary text-lg font-semibold">Loading...</p>
      </div>
    );
  }
  