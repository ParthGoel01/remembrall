import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { Copy } from 'lucide-react'
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

interface SharePostDialogProps {
    url: string
    open: boolean
    setOpen: (open: boolean) => void
}

export default function SharePostDialog({ url, open, setOpen }: SharePostDialogProps) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(url).then(() => {
            toast.success('Link copied to clipboard');
        })
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Share this post</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <p className="text-muted-foreground">Share this post on your favorite platforms:</p>
                    <div className="relative">
                        <Input 
                            value={url} 
                            readOnly 
                            className="pr-10" 
                            onFocus={(e) => e.target.blur()} 
                        />
                        <Button variant="ghost" size="icon" className="absolute rounded-l-none hover:bg-gray-200 cursor-pointer right-0 top-1/2 -translate-y-1/2" onClick={handleCopy}>
                            <Copy className="h-5 w-5" />
                        </Button>
                    </div>
                    <div className="flex justify-center gap-3">
                        <Button variant="ghost" className='cursor-pointer rounded-full h-10 w-10' onClick={() => window.open(shareUrls.facebook, '_blank')}>
                            <FaFacebook className="text-blue-600" style={{ width: "20px", height: "20px" }} />
                        </Button>
                        <Button variant="ghost" className='cursor-pointer rounded-full h-10 w-10' onClick={() => window.open(shareUrls.twitter, '_blank')}>
                            <FaTwitter className="text-sky-500" style={{ width: "20px", height: "20px" }} />
                        </Button>
                        <Button variant="ghost" className='cursor-pointer rounded-full h-10 w-10' onClick={() => window.open(shareUrls.linkedin, '_blank')}>
                            <FaLinkedin className="text-blue-700" style={{ width: "20px", height: "20px" }}/>
                        </Button>
                        <Button variant="ghost" className='cursor-pointer rounded-full h-10 w-10' onClick={() => window.open(shareUrls.whatsapp, '_blank')}>
                            <FaWhatsapp className="text-green-500" style={{ width: "20px", height: "20px" }}/>
                        </Button>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
