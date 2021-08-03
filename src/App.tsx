import react, { useEffect, useState } from "react";
import {
  TreeGridComponent,
  ColumnDirective,
  ColumnsDirective,
  Inject,
  Page,
  Sort,
  Filter,
  Edit,
  EditSettingsModel,
  
  Toolbar,
  ToolbarItems,
} from "@syncfusion/ej2-react-treegrid";
import "./App.css";

import {IModel} from "./IModel";

function App() {

   const [list,setList]= useState<any[] | []>([]);
   const [sublist,setSubList]=useState([]);

  useEffect(() => {
    
     fetch('https://dev-pegasus.gac.com/suite/webapi/jobService-getAllJobServices?jobId=4242', {
   method: 'GET',
   headers: {
     'Appian-API-Key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjMmVmOTYwNi0xNGFlLTQ5NDMtOTQyNy0xMDVmN2RlZmZmYzAifQ.tV_aC4B-Nbkp_5Oquq3o9RAgri75ir5kW75nyl5bYNU'
   }
 
 })
   .then(data => data.json())
   .then(result => 
    {
      const test:IModel[]=[];
      
      

      result.forEach((element:IModel) => {
       if(element.JobServiceAndChargeId)
       {
        
         var response= result.filter((i:IModel)=>i.JobServiceAndChargeId===element.ParentFk);

         if(response && response.length>0)
         {
           element.subtask=response[0];
           test.push(element);

           result=result.filter( (item:IModel)=> item.JobServiceAndChargeId!== element.ParentFk);
           
          
          

         }

         else
         {
          test.push(element);
  
        
  
         
         }
       }
      
        
      });
      setList( test);


     
    })
   
  }, []);


  return (
    <div>



      
      <TreeGridComponent
        dataSource={list}
        childMapping={"subtask"}
        treeColumnIndex={0}
        allowPaging={true}
        allowSorting={true}
        
        allowFiltering={true}
       
      >
        <Inject services={[Page, Sort,Toolbar]} />
        <ColumnsDirective>

        
          <ColumnDirective field= "JobServiceAndChargeId" headerText="JobServiceAndChargeId" isPrimaryKey={true} />
          <ColumnDirective field="OperationalProcessCode" headerText="OperationalProcessCode" />
          <ColumnDirective field="OperationalProcessName" headerText="OperationalProcessName"  />
          <ColumnDirective field="SupplierName" headerText="SupplierName"   />
         
         
        </ColumnsDirective>
      </TreeGridComponent>
    </div>
  );
}

export default App;
