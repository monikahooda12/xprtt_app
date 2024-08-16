import { ScrollView } from "react-native";

const listing =()=>{

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    
    const fetchMoreData = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await httpRequest({
          url: `${API.USERS}?page=${page + 1}`,
          method: 'GET',
        });
        setData([...data, ...(response?.data?.list || [])]);
        setPage(page + 1);
      } catch (error) {
        console.error('Error fetching more users:', error);
      } finally {
        setLoading(false);
      }



      
    };
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
      };

   

    return(
       <ScrollView>
onScroll={({ nativeEvent }) => {
  if (isCloseToBottom(nativeEvent)) {
    fetchMoreData();
  }
}}
scrollEventThrottle={400}

       </ScrollView>


    )
};
export default listing