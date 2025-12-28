import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';

export default function ScriptForm() {
    const [keyword, setKeyword] = useState('');
    const [ideas, setIdeas] = useState('');
    const [title, setTitle] = useState('');
    const [story, setStory] = useState('');
    const [finalScript, setFinalScript] = useState('');
    const [scriptId, setScriptId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const csrf =
        document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
            ?.content || '';

    /* STEP 2 */
    const generateIdeas = async () => {
        if (!keyword.trim()) return;

        setLoading(true);
        try {
            const res = await fetch('/scripts/ideas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf,
                },
                body: JSON.stringify({ keyword }),
            });

            const data = await res.json();

            if (data.success) {
                setIdeas(data.ideas);
                setScriptId(data.script_id);
                toast.success('Ideas generated');
            } else {
                toast.error(data.message);
            }
        } catch {
            toast.error('Failed to generate ideas');
        } finally {
            setLoading(false);
        }
    };

    /* STEP 3 */
    const generateStory = async () => {
        if (!title || !scriptId) return;

        setLoading(true);
        try {
            const res = await fetch('/scripts/story', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf,
                },
                body: JSON.stringify({
                    script_id: scriptId,
                    title,
                }),
            });

            const data = await res.json();

            if (data.success) {
                setStory(data.story);
                toast.success('Story generated');
            } else {
                toast.error(data.message);
            }
        } catch {
            toast.error('Failed to generate story');
        } finally {
            setLoading(false);
        }
    };

    /* STEP 4 */
    const generateFinalScript = async () => {
        if (!scriptId) return;

        setLoading(true);
        try {
            const res = await fetch('/scripts/final', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf,
                },
                body: JSON.stringify({ script_id: scriptId }),
            });

            const data = await res.json();

            if (data.success) {
                setFinalScript(data.script);
                toast.success('Final script ready');
            } else {
                toast.error(data.message);
            }
        } catch {
            toast.error('Failed to generate script');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">

            {/* STEP 1 */}
            <textarea
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter keyword (e.g. AI productivity)"
                className="w-full p-4 border rounded-lg"
            />

            <Button onClick={generateIdeas} disabled={loading}>
                Generate Ideas
            </Button>

            {/* STEP 2 */}
            {ideas && (
                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                    {ideas}
                </div>
            )}

            {/* STEP 3 */}
            {ideas && (
                <>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Paste one title here"
                        className="w-full p-3 border rounded-lg"
                    />

                    <Button onClick={generateStory} disabled={loading}>
                        Generate Story
                    </Button>
                </>
            )}

            {story && (
                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                    {story}
                </div>
            )}

            {/* STEP 4 */}
            {story && (
                <Button onClick={generateFinalScript} disabled={loading}>
                    Generate Final Script
                </Button>
            )}

            {finalScript && (
                <div className="bg-green-50 p-6 rounded-lg whitespace-pre-wrap">
                    {finalScript}
                </div>
            )}
        </div>
    );
}
