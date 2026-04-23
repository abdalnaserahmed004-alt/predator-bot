/* =========== 亗 WEKA_7_BOT - SOVEREIGN UTILS 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🐍 Component : Core Functional Utility Engine ⚡
 * ======================================================== */

import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import axios from "axios";
import FormData from 'form-data';
import { fileTypeFromBuffer } from "file-type";
import { Sticker, StickerTypes } from "wa-sticker-formatter";

const execAsync = promisify(exec);
const tmp = path.join(process.cwd(), "tmp");

if (!fs.existsSync(tmp)) {
    fs.mkdirSync(tmp, { recursive: true });
}

/**
 * 亗 بروتوكول صناعة الملصقات الملكية
 * @param {Buffer} buffer - المادة البصرية
 * @param {Object} options - إعدادات الحقوق والنوع
 */
const createSticker = async (buffer, options = {}) => {
    const sticker = new Sticker(buffer, {
        pack: options.pack || '亗 WEKA_7 亗',
        author: options.author || 'Ahmed_wek7 🦅',
        type: options.type || StickerTypes.FULL,
        categories: options.categories || ['🤩', '👑'],
        id: options.id || '201210155616',
        quality: 75 // توازن مثالي بين الجودة والحجم عشان "السرعة"
    });
    return sticker.build();
};

/**
 * 亗 بروتوكول تحويل الأهداف المتحركة (GIF to MP4)
 * @param {String} url - رابط الـ GIF
 */
async function gifToMp4(url) {
    const id = Date.now();
    const gifPath = path.join(tmp, `${id}.gif`);
    const mp4Path = path.join(tmp, `${id}.mp4`);
    
    try {
        const writer = fs.createWriteStream(gifPath);
        const res = await axios({ url, responseType: 'stream' });
        res.data.pipe(writer);
        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
        
        // استخدام تسريع المعالجة وتحسين الضغط السيادي
        await execAsync(`ffmpeg -i "${gifPath}" -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -preset ultrafast -pix_fmt yuv420p "${mp4Path}" -y`);
        
        const buffer = fs.readFileSync(mp4Path);
        if (fs.existsSync(gifPath)) fs.unlinkSync(gifPath);
        if (fs.existsSync(mp4Path)) fs.unlinkSync(mp4Path);
        
        return buffer;
    } catch (e) {
        if (fs.existsSync(gifPath)) fs.unlinkSync(gifPath);
        console.error("亗 [GIF2MP4 ERROR]: " + e.message);
        throw e;
    }
}

/**
 * 亗 بروتوكول الرفع السحابي الاستخباراتي (CatBox)
 * @param {Buffer} buffer - الملف المراد رفعه
 */
async function uploadToCatbox(buffer) {
    try {
        const type = await fileTypeFromBuffer(buffer);
        const ext = type ? type.ext : 'bin';
        const mime = type ? type.mime : 'application/octet-stream';
        
        const form = new FormData();
        form.append('reqtype', 'fileupload');
        form.append('fileToUpload', buffer, {
            filename: `${Date.now()}.${ext}`,
            contentType: mime
        });

        const response = await axios.post('https://catbox.moe/user/api.php', form, {
            headers: form.getHeaders(),
            timeout: 30000 // مهلة 30 ثانية للرفع
        });

        if (!response.data || !response.data.includes('catbox')) {
            throw new Error('Cloud Infiltration Failed');
        }

        return response.data.trim();
    } catch (e) {
        console.error("亗 [CATBOX ERROR]: " + e.message);
        throw e;
    }
}

/**
 * 亗 بروتوكول الذكاء الاصطناعي السيادي (Pollinations)
 * @param {Object} options - النص والموديل المطلوبة
 */
async function AiChat(options = {}) {
    try {
        const model = options.model || "openai";
        const encodedText = encodeURIComponent(options.text);
        const response = `https://text.pollinations.ai/${encodedText}?model=${model}`;
        
        const res = await fetch(response);
        return await res.text();
    } catch (e) {
        return `*❌ الـمـعـالـج الـذهـني كـرف يـا مطور ${options.author || "احمد_wek7"}!*`;
    }
}

export { gifToMp4, uploadToCatbox, createSticker, AiChat };
