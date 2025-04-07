import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShareIcon } from 'lucide-react';
import SharePostDialog from './sharePostDialog';

export default function ShareButton ({ url }: {url: string}){
    const [showDialog, setShowDialog] = useState(false)
    return (
        <>
            <Button variant="ghost" size="icon" onClick={() => setShowDialog(true)}>
                <ShareIcon className="h-5 w-5" />
            </Button>
            <SharePostDialog url={url} open={showDialog} setOpen={setShowDialog} />
        </>
    )
}
