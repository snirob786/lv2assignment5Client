import { useEffect, useState } from "react";
import { toast } from "sonner";
import BikeTable from "../../components/ui/BikeTable";
import {
  useDeleteBikeMutation,
  useGetAllBikeDetailsQuery,
} from "../../redux/features/bikeManagement/bikeManagementApi";

const Bikes = () => {
  const [bikeList, setBikeList] = useState<any[]>([]);
  const [filter, setFilter] = useState({});
  const { data, refetch } = useGetAllBikeDetailsQuery(filter);

  const [deleteBikeMutation] = useDeleteBikeMutation();

  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    const newData = data?.data.map((item: any, index: number) => {
      const newItem = {
        ...item,
        key: index + 1,
      };
      return newItem;
    });
    setBikeList(newData);
    console.log(newData);
  }, [data]);

  const handleDelete = async (id: string) => {
    const toastId: any = toast.loading(`Deleting ${id}`);
    try {
      console.log("deleted id: ", id);
      await deleteBikeMutation(id);
      const newArray = bikeList.filter((bike) => bike?._id !== id);
      setBikeList(newArray);
      toast.success(`Deleted ${id}`, toastId);
    } catch (error) {
      toast.error("Something went wrong deleting item", toastId);
    }
  };

  return (
    <>
      <BikeTable
        bikeList={bikeList}
        handleDelete={handleDelete}
        refetch={refetch}
        setFilter={setFilter}
      />
      {/* {bikeList?.length > 0 ? (
        
      ) : (
        <Empty />
      )} */}
    </>
  );
};

export default Bikes;
