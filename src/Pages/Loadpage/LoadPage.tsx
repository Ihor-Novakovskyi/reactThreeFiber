import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Group from "../../Components/Group/Group";
interface LoadPageInterface {
	closeLoadPage: () => void;
}
export default function LoadPage({ closeLoadPage }: LoadPageInterface) {
    useEffect(() => { 
        document.body.style.overflow = 'hidden';
        return () => { 
            document.body.style.overflow = ''
        };
    },[])
	return (
		<div className="load-page">
			<Canvas>
				<Group closeLoadPage={closeLoadPage} />
			</Canvas>
		</div>
	);
}
