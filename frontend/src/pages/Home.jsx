import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      
      <h1 className="text-5xl font-bold text-blue-600 mb-4">
        Welcome
      </h1>

      <p className="text-gray-600 mb-8">
        Document Signature App
      </p>

      <Link
        to="/login"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Login
      </Link>

    </div>
  );
}

export default Home;