/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { ContactService } from '../services/contact.service';
import { ApiResponse } from '../dto/product.dto';

export class ContactController {
    private service: ContactService | null = null;

    private getService(): ContactService {
        if (!this.service) this.service = new ContactService();
        return this.service;
    }

    async handlePost(req: NextRequest): Promise<NextResponse<ApiResponse<null>>> {
        try {
            const body = await req.json();
            const pageUri = req.headers.get('referer') ?? req.nextUrl.origin;
            await this.getService().saveInquiry(body, pageUri);

            return NextResponse.json({
                success: true,
                data: null,
                message: "Your message has been sent successfully!",
                metadata: { total: 1, timestamp: new Date().toISOString() }
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                message: "Failed to send message",
                error: error.message
            }, { status: 500 });
        }
    }
}
