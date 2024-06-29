import React, { useEffect, useState } from 'react';
import bci from './images/bc.png'; 
import bro from './images/bro.png'; 
import Header from './component/header';
import Menu from './component/menu';
import SideMenu2 from './component/sideMenu2';
import API_BASE_URL from './config/apiConfig';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { jwtDecode } from "jwt-decode";
import "@bitnoi.se/react-scheduler/dist/style.css";
import axios from 'axios';
import { Scheduler, SchedulerData } from "@bitnoi.se/react-scheduler";

function TimelineView() {

    const navigate = useNavigate();
    const access_token = localStorage.getItem('access_token');
    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken.userId;

    const projectId = localStorage.getItem('nProject');
    console.log(userId);

    const [filterButtonState, setFilterButtonState] = useState(0);
    const [schedulerData, setSchedulerData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [timelines, setTimelines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchTimelines = async () => {
        try {
            const projectId = localStorage.getItem('nProject');
          const response = await axios.get(API_BASE_URL+`/api/algo/${projectId}`);
          console.log(response);
          //setTimelines(response.data);
          const transformedData = transformData(response.data);
          setTimelines(transformedData);
          console.log("Transformed Data:", transformedData);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      fetchTimelines();
    }, [projectId]);


  
    const transformData = (timelines) => {
      //setIsLoading(true);
      return timelines.map(timeline => ({
        id: timeline._id,
        label: {
          icon: "https://picsum.photos/24", // Static or dynamic icon URL
          title: timeline.task, // Placeholder name, replace with actual data if available
          subtitle: timeline.phase// Placeholder role, replace with actual data if available
        },
        data: [
          {
            id: timeline._id,
            startDate: new Date(timeline.startDate),
            endDate: new Date(timeline.endDate),
            // occupancy: 360, // Placeholder value, replace with actual data if available
            title: timeline.task,
            description: `${timeline.completionPercentage}% progress`,
            bgColor: timeline.color
          }
        ]
      }));
    };

    console.log(transformData);
   
    const mockedSchedulerData = [
        {
          id: "070ac5b5-8369-4cd2-8ba2-0a209130cc60",
          label: {
            icon: "https://picsum.photos/24",
            title: "Joe Doe",
            subtitle: "Frontend Developer"
          },
          data: [
            {
              id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba3762",
              startDate: new Date("2024-04-13T15:31:24.272Z"),
              endDate: new Date("2024-08-28T10:28:22.649Z"),
              occupancy: 3600,
              title: "UI",
              description: "49% progress",
              bgColor: "rgb(254,165,177)"
            },
          ]
        },
        
        {
            id: "070ac5b5-8369-4cd2-8ba2-0y209130cc60",
            label: {
              icon: "https://picsum.photos/24",
              title: "UI",
              subtitle: "Frontend Developer"
            },
            data: [
              {
                id: "8b71a8a5-33dd-4fc8-9caa-b4a584ta3762",
                startDate: new Date("2024-07-13T15:31:24.272Z"),
                endDate: new Date("2024-08-28T10:28:22.649Z"),
                occupancy: 3600,
                title: "Ui",
                description: "80%progress",
                bgColor: "rgb(111 99 101)"
              },
             
            ]
          },

          {
            id: "070ac5b5-8369-4cd2-8ba2-0a209130cc60d",
            label: {
              icon: "https://picsum.photos/24",
              title: "Wireframe",
              subtitle: "Wireframe"
            },
            data: [
              {
                id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba376d2",
                startDate: new Date("2024-07-09T15:31:24.272Z"),
                endDate: new Date("2024-08-28T10:28:22.649Z"),
                occupancy: 3600,
                title: "Wireframe",
                description: "80%progress",
                bgColor: "rgb(0 0 0)"
              },
             
            ]
          },

          {
            id: "070ac5b5-8369-4cd2-8ba2-0a289130cc60",
            label: {
              icon: "https://picsum.photos/24",
              title: "UI",
              subtitle: "Frontend Developer"
            },
            data: [
              {
                id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba3760",
                startDate: new Date("2024-07-13T15:31:24.272Z"),
                endDate: new Date("2024-08-28T10:28:22.649Z"),
                occupancy: 3600,
                title: "Ui",
                description: "80%progress",
                bgColor: "rgb(111 99 101)"
              },
             
            ]
          },

          {
            id: "070ac5b5-8369-4cd2-8ba2-0a209130cc607",
            label: {
              icon: "https://picsum.photos/24",
              title: "Wireframe",
              subtitle: "Wireframe"
            },
            data: [
              {
                id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba376b2",
                startDate: new Date("2024-07-09T15:31:24.272Z"),
                endDate: new Date("2024-08-28T10:28:22.649Z"),
                occupancy: 3600,
                title: "Wireframe",
                description: "80%progress",
                bgColor: "rgb(145 57 38)"
              },
             
            ]
          },

          {
            id: "070ac5b5-8369-4cd2-8ba2-0a209130ci60",
            label: {
              icon: "https://picsum.photos/24",
              title: "UI",
              subtitle: "Frontend Developer"
            },
            data: [
              {
                id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba3712",
                startDate: new Date("2024-07-13T15:31:24.272Z"),
                endDate: new Date("2024-08-28T10:28:22.649Z"),
                occupancy: 3600,
                title: "Ui",
                description: "80%progress",
                bgColor: "rgb(118 111 183)"
              },
             
            ]
          },

          {
            id: "070ac5b5-8369-4cd2-8ba2-0a209130cc90d",
            label: {
              icon: "https://picsum.photos/24",
              title: "Wireframe",
              subtitle: "Wireframe"
            },
            data: [
              {
                id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba376w2",
                startDate: new Date("2024-07-20T15:31:24.272Z"),
                endDate: new Date("2024-08-28T10:28:22.649Z"),
                occupancy: 3600,
                title: "Wireframe",
                description: "80%progress",
                bgColor: "rgb(0 0 0)"
              },
             
            ]
          },

          {
            id: "070ac5b5-8369-4cd2-8ba2-0a209130cc40",
            label: {
              icon: "https://picsum.photos/24",
              title: "UI",
              subtitle: "Frontend Developer"
            },
            data: [
              {
                id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba3702",
                startDate: new Date("2024-07-07T15:31:24.272Z"),
                endDate: new Date("2024-08-28T10:28:22.649Z"),
                occupancy: 3600,
                title: "Ui",
                description: "80%progress",
                bgColor: "rgb(111 99 101)"
              },
             
            ]
          },

          {
            id: "070ac5b5-8369-4cd2-8ba2-0a209130vc60d",
            label: {
              icon: "https://picsum.photos/24",
              title: "Wireframe",
              subtitle: "Wireframe"
            },
            data: [
              {
                id: "8b71a8a5-33dd-4fc8-9caa-b4a584bv376d2",
                startDate: new Date("2024-07-15T15:31:24.272Z"),
                endDate: new Date("2024-08-28T10:28:22.649Z"),
                occupancy: 3600,
                title: "Wireframe",
                description: "80%progress",
                bgColor: "rgb(51 145 38)"
              },
             
            ]
          },
    ];

      useEffect(() => {
        // Simulate fetching data from an API
        setSchedulerData(transformData);
      }, []);

      return (

       
       
      

    <div className='container2'>
        
         <div className="main-content">
        
        
         <div className='main-content2' style={{paddingLeft:40, paddingRight:40}}>

        
          <div className='bacWHI'>

          <section style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Scheduler
                data={timelines}
                isLoading={isLoading}
                onRangeChange={(newRange) => console.log(newRange)}
                onTileClick={(clickedResource) => console.log(clickedResource)}
                onItemClick={(item) => console.log(item)}
                onFilterData={() => {
                // Some filtering logic...
                setFilterButtonState(1);
                }}
                onClearFilterData={() => {
                // Some clearing filters logic...
                setFilterButtonState(0)
                }}
                config={{
                zoom: 1,
                maxRecordsPerPage:10,

                filterButtonState:-1,
                }}
            />
         </section>
            
        </div>  
          
         </div>

        
    </div>
</div> 

      );
    }




  export default TimelineView;
