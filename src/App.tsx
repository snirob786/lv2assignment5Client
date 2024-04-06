import MainLayout from "./components/layout/MainLayout";
import ProtectedLayout from "./components/layout/ProtectedLayout";

function App() {
  return (
    <>
      <ProtectedLayout>
        <MainLayout />
      </ProtectedLayout>
    </>
  );
}

export default App;
