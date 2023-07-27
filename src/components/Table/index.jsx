import { useContext } from 'react'
import { langContext } from '../../contexts/commonContext'
import './style.css'
import { LANG } from '../../dictionary.js'
import { useState } from 'react'


const Table = (props) => {
    const { lang, setLang } = useContext(langContext)
    // console.log(lang)
    // console.log(props.data)

    const handleStatus = (idx) => {
        const updatedData = [...props.data];
        updatedData[idx].status = !updatedData[idx].status;
        props.setData(updatedData);
    }

    return (
        <div className="container-component-table">
            {/* <button onClick={() => {
                setLang()
            }}>Thay đổi ngôn ngữ</button> */}
            {props.children}
            {/* <button onClick={() => {
                setLang()
            }}>Thay đổi giao diện</button> */}
            <div className="header-table">
                <div className="header name-todo">{LANG[lang]['A_1']}</div>
                <div className="header description-todo">{LANG[lang]['A_2']}</div>
                <div className="header status-todo">{LANG[lang]['A_3']}</div>
                <div className="header action-todo">{LANG[lang]['A_4']}</div>
            </div>
            {props.data.length !== 0 ? props.data.map((item, idx) => {
                return (
                    <div className="row" key={idx}>
                        <div className="cell name">{item.name}</div>
                        <div className="cell des">{item.des}</div>
                        <div className="cell status">
                            <div className="data">{item.status ? 'Complete' : 'Pending'}</div>
                        </div>
                        <div className="cell action">
                            <button onClick={() => { props.showAlert(item) }}>edit</button>
                            <button onClick={() => {
                                props.setStatus(item.id, item.status);
                                handleStatus(idx)
                            }} style={{ backgroundColor: "orange" }}>{item.status ? 'Mark as pending' : 'Mark as complete'}</button>
                            <button onClick={() => { props.deleteTodo(item.id) }}>delete</button>
                        </div>
                    </div>
                )
            }) : <div>Không có dữ liệu</div>
            }
            <div style={{ borderTop: "1px solid black" }}>
                <button onClick={() => {
                    setLang()
                }}>Thay đổi ngôn ngữ</button>
            </div>
        </div>
    )
}
export default Table;