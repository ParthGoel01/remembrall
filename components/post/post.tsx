"use client";

import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import ShareButton from "./shareButton";
import moment from 'moment';
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Comment {
  profilePicture: string;
  username: string;
  timestamp: string;
  text: string;
}

interface PostProps {
  profilePicture: string;
  username: string;
  timestamp: string;
  mediaUrls: string[];
  mediaTypes: string[];
  heading: string;
  tags: string[];
  description: string;
  likes: number;
  comments: Comment[];
  postUrl: string;
  currentUserProfilePicture: string;
}

export default function Post({
  profilePicture,
  username,
  timestamp,
  mediaUrls,
  mediaTypes,
  heading,
  tags,
  description,
  likes,
  comments,
  postUrl,
  currentUserProfilePicture,
}: PostProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="rounded-lg border-gray-200 border-1 overflow-hidden m-5 mt-2">
      <div className="flex items-center p-4">
        <Image src={profilePicture} alt="Profile" width={30} height={30} className="w-13 h-13 rounded-full" />
        <div className="ml-3">
          <Link href='/' className="hover:underline"><p className="font-semibold text-xl text-gray-800">{username}</p></Link>
          <p className="text-sm text-gray-500">{moment(timestamp).fromNow()}</p>
        </div>
      </div>
        
      {mediaUrls.length > 1 ? (
        <Carousel className="relative">
          <CarouselContent >
            {mediaUrls.map((url, index) => (
              <CarouselItem key={index}>
                <div className="flex justify-center items-center">
                  {mediaTypes[index] === "image" ? (
                    <Image src={url} alt="Post" width={200} height={200} className="w-[97.5%] object-cover rounded-lg" />
                  ) : (
                    <video controls className="w-[97.5%] rounded-lg">
                      <source src={url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-8 top-1/2 "/>
          <CarouselNext className="right-8 top-1/2"/>
        </Carousel>
      ) : (
        <div className="flex justify-center items-center">
          {mediaTypes[0] === "image" ? (
            <Image src={mediaUrls[0]} alt="Post" width={200} height={200} className="w-[97.5%] object-cover rounded-lg" />
          ) : (
            <video controls className="w-[97.5%] rounded-lg">
              <source src={mediaUrls[0]} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}

      <div className="p-4">
        <h2 className="font-bold text-lg">{heading}</h2>
        <p className="text-sm text-gray-600 mt-1 flex gap-2">
          {tags.map((tag, index) => 
            <Link href="/" key={index} className="hover:underline">#{tag}</Link>
          )}
        </p>
        <div className="mt-2 text-gray-800">
          <Markdown remarkPlugins={[remarkGfm]}>
            {description}
          </Markdown>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="cursor-pointer" onClick={()=>{setIsLiked(!isLiked)}}>
            {isLiked ? 
             <div className="flex items-center gap-1.5"><FaHeart className="text-red-500" style={{ width: "18px", height: "18px" }} />
             <p className="font-semibold text-gray-700">{likes+1}</p></div>
             : 
             <div className="flex items-center gap-1.5"><FaHeart style={{ width: "18px", height: "18px" }} className="text-gray-300" />
             <p className="font-semibold text-gray-700">{likes}</p></div>}
          </span>
          <div>
            <ShareButton url={postUrl}/>
          </div>
        </div>
      </div>

      <div className="p-4 border-t-1 border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-2 text-xl">{comments.length} Comments</h3>
        <div className="">
          <div className="flex items-center gap-2 p-3">
            <Image src={currentUserProfilePicture} alt="User" width={20} height={20} className="rounded-full w-7 h-7"/>
            <Input type="text" placeholder="Add a comment..." className="w-full m-2 border-gray-300 rounded-lg" />
            <Button variant="secondary" className="bg-blue-500 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-600">Comment</Button>
          </div>
        </div>
        <div className="max-h-[200px] overflow-scroll">
          {comments.length > 0 ? (
            comments.map((comment,index) => (
              <div key={index} className="p-3">
                <div className="flex items-center">
                  <Image src={comment.profilePicture} alt="Profile" width={30} height={30} className="w-7 h-7 rounded-full" />
                  <div className="ml-3 flex items-center gap-0.5">
                    <Link href='/' className="hover:underline"><p className="font-semibold text-gray-800">{comment.username}</p></Link>
                    <div className="mx-2 w-1 h-1 bg-gray-400 rounded-full" />
                    <p className="text-sm text-gray-500">{moment(comment.timestamp).fromNow()}</p>
                  </div>
                </div>
                <div className="flex items-start ml-10 mt-2">
                  <p className="text-gray-600">{comment.text}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}