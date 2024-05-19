import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { NodeService } from './NodeService';

export default function DynamicColumnsDemo() {
    const [nodes, setNodes] = useState([]);
    const columns = [
        { field: 'name', header: 'Name', expander: true },
        { field: 'size', header: 'Type' },
        { field: 'type', header: 'Size' }
    ];

    useEffect(() => {
        NodeService.getTreeTableNodes().then((data) => setNodes(data));
    }, []);

    return (
        <div className="card">
            <br/><br/><br/>
            <TreeTable value={nodes} tableStyle={{ minWidth: '50rem' }} style={{ textAlign: 'center', width: '80%', paddingRight: '10%', paddingLeft: '10%', marginLeft: '10%' }}>
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} expander={col.expander} />
                ))}
            </TreeTable>
        </div>
    );
}
        