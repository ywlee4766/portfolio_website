import { useState } from 'react'
import { Card, Col, Row, ButtonGroup, Button } from 'react-bootstrap'
import * as Api from '../../api'
import Replies from './CommentReply/Replies'

const CommentCard=({ comment, setComments, isEditable, setIsEditing, author })=>{
    const { id, author_name, text, createdAt }=comment    
    
    const [showReplies,setShowReplies]=useState(false)

    const handleDelete= async ()=>{
        await Api.delete('comment', id)
        // const res=await Api.get('user/comment',userId)
        // setComments(res.data)
        setComments((comments)=>{
            const pos=comments.findIndex((c)=>c.id===comment.id)
            if(pos>=-1) {
                comments.splice(pos,1)
                return [...comments]
            }
            return comments
        })
    }

    return(
        <Card.Body className="mt-2 text-justify float-left">
                <Card className="p-3">
                    <Row>
                        <Col xs={10} className="text-primary ">
                            <h4>{author_name}</h4></Col>
                        <Col xs={2} className="text-secondary">
                            <h6>{createdAt.slice(0,10)}</h6> </Col>
                    </Row>
                <Card.Text className="mt-2">{text}</Card.Text>
                <Col>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="secondary" className="me-1" onClick={ ()=>setShowReplies(prev=>!prev) }>Reply</Button>
                        { isEditable && (
                            <>
                                <Button variant="secondary" className="me-1" onClick={ ()=>setIsEditing(true) }>Edit</Button>
                                <Button variant="secondary" onClick={ handleDelete }>Delete</Button>
                            </>
                        ) }
                    </ButtonGroup>
                </Col>
                { showReplies && (
                            <Replies 
                                id={id} 
                                author={author}
                            />
                ) }
                </Card>
            </Card.Body>
    )
}

export default CommentCard