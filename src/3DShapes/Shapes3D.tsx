import React from "react"

interface FigureInterface { 
    
    onTouchStart: () => void | null,
    onMouseMove: () => void | null,
    onDoubleClick: () => void | null,
    
}
// создаем отдельно каждій єлмента
export function Tetrahedron(props: FigureInterface | {}) { 
    return (
        <mesh
            {...props}
        >
            <tetrahedronGeometry args={[1, 1]} />
            <meshBasicMaterial color={0x00ff00} wireframe={true} />
        </mesh>
        
    )
}
export function Cube(props: FigureInterface | {}) {
    return (
        <mesh
            {...props}
        >
            <boxGeometry args={[1, 1, 1, 10, 10, 10]} />
            <meshBasicMaterial color={0x00ff00} wireframe={true} />
        </mesh>
        
    )
}
export function Cylinder(props: FigureInterface | {}) {
    return (
        <mesh
            {...props}
        >
            <cylinderGeometry args={[1, 1, 1, 32]} />
            <meshBasicMaterial color={0x00ff00} wireframe={true} />
        </mesh>
    )
}
export function Torus(props: FigureInterface | {}) {
    return (
        <mesh
            {...props}
        >
            <torusGeometry  />
            <meshBasicMaterial color={0x00ff00} wireframe={true} />
        </mesh>
    )
}