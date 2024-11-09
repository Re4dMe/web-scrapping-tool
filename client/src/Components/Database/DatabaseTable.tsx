import '../../Style/DatabaseTable.css'
import { useState, useEffect } from 'react';

const fetchData = async (): Promise<any> => {
    let url: string = "http://localhost:5000/DatabaseQueryService/getData";
    return fetch(url)
        .then((res) => { 
            return res.json(); 
        })
        .then((data) => {
            return data
        })
        .catch((err) => console.log("Error while fetching: " + err));
}

interface qaData {
    title: string,
    url: string,
}

export const DatabaseTable = (props: any) => {
    
    const [qaData, setQAData] = useState<qaData[]>([]);

    useEffect(() => {
        let i = 0;
        let run = async () => {             
            let data: qaData[] = await fetchData() as qaData[];
            setQAData(data);
        }
        setTimeout(run, 3000);
 
    }, [])
    
    return (
        <>
            <div className="overflowContent">
                <table className="fixedHeader">
                    <tr>
                        <th>Title</th>
                        <th>Url</th>
                    </tr>
                    {
                        qaData.map((data: any) => (        
                            <tr>
                                <td>{ data.title }</td>
                                <td>{ data.url }</td>
                            </tr>  
                        ))
                    }   
                </table>
            </div>
        </>
    );
    
}
 
